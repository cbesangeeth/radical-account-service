/**
 * 
 */
package com.cbesangeeth.radical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author sangeeth
 *
 *
 * <h1>Radical Accounts Service</h1>
 * Microservice to manage users, permissions, roles and token.
 *
 */
@SpringBootApplication
public class Application {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
}
