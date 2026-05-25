package FurnitureShop.com.example.FurnitureShop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who added product to cart

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Product reference

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Quantity

    @Column(nullable = false)
    private Integer quantity;

    private LocalDateTime createdAt = LocalDateTime.now();
}
