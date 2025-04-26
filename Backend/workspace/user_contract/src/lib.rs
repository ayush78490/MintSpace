#![no_std]

use soroban_sdk::{contract, contractimpl, Env, String, Vec, vec};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn hello(env: Env, name: String) -> Vec<String> {
        vec![
            &env,
            String::from_str(&env, "Hello"),
            name,
        ]
    }
}