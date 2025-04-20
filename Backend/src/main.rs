use actix_cors::Cors;
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct CodeRequest {
    code: String,
}

#[post("/compile")]
async fn receive_code(req_body: web::Json<CodeRequest>) -> impl Responder {
    println!("🔥 Code received from frontend:\n{}", req_body.code);
    HttpResponse::Ok().body("✅ Code received!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("📡 Listening on http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive()) // For local testing - allows any origin
            .service(receive_code)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
