use actix_cors::Cors;
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use std::{fs, process::Command, path::Path};

#[derive(Deserialize)]
struct CodeRequest {
    code: String,
}

const TEMPLATE_PATH: &str = "./templates";
const WORKSPACE_PATH: &str = "./workspace/user_contract";

#[post("/compile")]
async fn receive_code(req: web::Json<CodeRequest>) -> impl Responder {
    let src_dir = format!("{}/src", WORKSPACE_PATH);
    let lib_rs_path = format!("{}/lib.rs", src_dir);
    let cargo_toml_src = format!("{}/Cargo.toml", TEMPLATE_PATH);
    let cargo_toml_dst = format!("{}/Cargo.toml", WORKSPACE_PATH);

    println!("📁 Ensuring src directory exists: {}", src_dir);
    if let Err(e) = fs::create_dir_all(&src_dir) {
        eprintln!("❌ Directory creation error: {}", e);
        return HttpResponse::InternalServerError().body(format!("Directory error: {}", e));
    }

    println!("📝 Writing lib.rs");
    match fs::write(&lib_rs_path, &req.code) {
        Ok(_) => println!("✅ lib.rs written to {}", lib_rs_path),
        Err(e) => {
            eprintln!("❌ Failed to write lib.rs: {}", e);
            return HttpResponse::InternalServerError().body(format!("Failed to write lib.rs: {}", e));
        }
    }

    println!("📦 Copying Cargo.toml to workspace");
    match fs::copy(&cargo_toml_src, &cargo_toml_dst) {
        Ok(_) => println!("✅ Cargo.toml copied to {}", cargo_toml_dst),
        Err(e) => {
            eprintln!("❌ Failed to copy Cargo.toml: {}", e);
            return HttpResponse::InternalServerError().body(format!("Failed to copy Cargo.toml: {}", e));
        }
    }

    let docker_path = Path::new(WORKSPACE_PATH).canonicalize().unwrap();
    println!("🐳 Running Docker build in: {}", docker_path.to_string_lossy());

    let output = Command::new("docker")
        .args([
            "run", "--rm",
            "-v", &format!("{}:/workspace", docker_path.to_string_lossy()),
            "rust-soroban", // ← updated image name here
            "sh", "-c", "cd /workspace && soroban contract build",
        ])
        .output();

    match output {
        Ok(out) => {
            let stdout = String::from_utf8_lossy(&out.stdout);
            let stderr = String::from_utf8_lossy(&out.stderr);

            println!("📤 Docker stdout:\n{}", stdout);
            println!("📥 Docker stderr:\n{}", stderr);

            if out.status.success() {
                HttpResponse::Ok().body(format!("✅ Compiled Successfully!\n{}", stdout))
            } else {
                HttpResponse::BadRequest().body(format!("❌ Compilation Failed:\n{}", stderr))
            }
        }
        Err(e) => {
            eprintln!("❌ Docker command failed: {}", e);
            HttpResponse::InternalServerError().body(format!("Docker error: {}", e))
        }
    }
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🚀 Starting server on http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(receive_code)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
