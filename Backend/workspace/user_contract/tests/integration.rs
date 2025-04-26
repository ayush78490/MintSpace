#[cfg(test)]
mod integration {
    use soroban_sdk::{Env, String, vec};
    use user_contract::Contract;

    #[test]
    fn test_hello() {
        let env = Env::default();
        let contract = Contract;
        
        let name = String::from_str(&env, "Dev");
        let response = contract.hello(name);
        
        assert_eq!(
            response,
            vec![&env, String::from_str(&env, "Hello"), String::from_str(&env, "Dev")]
        );
    }
}