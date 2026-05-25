package FurnitureShop.com.example.FurnitureShop.repository;

import FurnitureShop.com.example.FurnitureShop.entity.Product;
import FurnitureShop.com.example.FurnitureShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller(User seller);
}