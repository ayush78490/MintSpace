FROM rust:1.86-slim as builder

# Install build dependencies
RUN apt-get update && \
    apt-get install -y \
    curl \
    clang \
    git \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install wasm target
RUN rustup target add wasm32-unknown-unknown

# Install Soroban CLI (instead of stellar-cli)
RUN cargo install --locked soroban-cli

# Create non-root user
RUN useradd -m -u 1001 -U rustuser
USER rustuser

WORKDIR /workspace

# Pre-cache dependencies
COPY --chown=rustuser templates/Cargo.toml /workspace/Cargo.toml
RUN mkdir -p src && \
    touch src/lib.rs && \
    cargo build --target wasm32-unknown-unknown --release || true

CMD ["/bin/bash"]