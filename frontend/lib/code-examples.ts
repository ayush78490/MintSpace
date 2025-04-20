export function getSdkCodeExample(version: string): string {
  // Return different code examples based on SDK version
  switch (version) {
    case "0.9.0":
      return `#![no_std]
use soroban_sdk::{contractimpl, symbol, vec, Env, Symbol, Vec};

pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol!("Hello"), to]
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let user = Address::random(&env);
        let name = Symbol::from_str("Dev");
        let res = client.hello(&name);
        assert_eq!(res, vec![&env, symbol!("Hello"), name]);
    }
}
`

    case "0.10.0":
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol, vec, Env, Symbol, Vec};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol!("Hello"), to]
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let user = Address::random(&env);
        let name = Symbol::from_str("Dev");
        let res = client.hello(&name);
        assert_eq!(res, vec![&env, symbol!("Hello"), name]);
    }
}
`

    case "0.11.0":
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let user = Address::random(&env);
        let name = Symbol::short("Dev");
        let res = client.hello(&name);
        assert_eq!(res, vec![&env, symbol_short!("Hello"), name]);
    }
}
`

    case "1.0.0":
    default:
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let user = Address::random(&env);
        let name = Symbol::short("Dev");
        let res = client.hello(&name);
        assert_eq!(res, vec![&env, symbol_short!("Hello"), name]);
    }
}
`
  }
}

// More complex example for token contract
export function getTokenContractExample(version: string): string {
  switch (version) {
    case "0.9.0":
      return `#![no_std]
use soroban_sdk::{contractimpl, token, Address, Env, String};

pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn initialize(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        let token = token::Token::new(&e);
        token.initialize(&admin, &decimal, &name, &symbol);
    }

    pub fn mint(e: Env, to: Address, amount: i128) {
        let token = token::Token::new(&e);
        token.mint(&to, &amount);
    }

    pub fn balance(e: Env, id: Address) -> i128 {
        let token = token::Token::new(&e);
        token.balance(&id)
    }
}
`

    case "0.10.0":
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, token, Address, Env, String};

#[contract]
pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn initialize(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.initialize(&admin, &decimal, &name, &symbol);
    }

    pub fn mint(e: Env, to: Address, amount: i128) {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.mint(&to, &amount);
    }

    pub fn balance(e: Env, id: Address) -> i128 {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.balance(&id)
    }
}
`

    case "0.11.0":
    case "1.0.0":
    default:
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, token, Address, Env, String};

#[contract]
pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn initialize(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.initialize(&admin, &decimal, &name, &symbol);
    }

    pub fn mint(e: Env, to: Address, amount: i128) {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.mint(&to, &amount);
    }

    pub fn balance(e: Env, id: Address) -> i128 {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.balance(&id)
    }

    pub fn transfer(e: Env, from: Address, to: Address, amount: i128) {
        let token = token::Client::new(&e, &e.current_contract_id());
        token.transfer(&from, &to, &amount);
    }
}
`
  }
}

// Example for a marketplace contract
export function getMarketplaceContractExample(version: string): string {
  switch (version) {
    case "0.9.0":
    case "0.10.0":
      return `#![no_std]
use soroban_sdk::{contractimpl, Address, Env, Map, Vec};

pub struct MarketplaceContract;

#[contractimpl]
impl MarketplaceContract {
    pub fn list_item(e: Env, seller: Address, item_id: u32, price: i128) {
        // Implementation for older SDK versions
    }

    pub fn buy_item(e: Env, buyer: Address, item_id: u32) {
        // Implementation for older SDK versions
    }
}
`

    case "0.11.0":
    case "1.0.0":
    default:
      return `#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Map, Vec};

#[contract]
pub struct MarketplaceContract;

#[derive(Clone)]
#[contracttype]
pub struct Item {
    seller: Address,
    price: i128,
    sold: bool,
}

#[contractimpl]
impl MarketplaceContract {
    pub fn list_item(e: Env, seller: Address, item_id: u32, price: i128) {
        seller.require_auth();
        
        let item = Item {
            seller: seller.clone(),
            price,
            sold: false,
        };
        
        // Store the item in contract storage
        let mut items = e.storage().instance().get(&symbol_short!("ITEMS")).unwrap_or(Map::new(&e));
        items.set(item_id, item);
        e.storage().instance().set(&symbol_short!("ITEMS"), items);
    }

    pub fn buy_item(e: Env, buyer: Address, item_id: u32) {
        buyer.require_auth();
        
        // Get the item from storage
        let mut items: Map<u32, Item> = e.storage().instance().get(&symbol_short!("ITEMS")).unwrap();
        let mut item = items.get(item_id).unwrap();
        
        // Check if the item is not sold
        if item.sold {
            panic!("Item already sold");
        }
        
        // Transfer tokens from buyer to seller (would use token contract in real implementation)
        // token_client.transfer(&buyer, &item.seller, &item.price);
        
        // Mark item as sold
        item.sold = true;
        items.set(item_id, item);
        e.storage().instance().set(&symbol_short!("ITEMS"), items);
    }
}
`
  }
}
