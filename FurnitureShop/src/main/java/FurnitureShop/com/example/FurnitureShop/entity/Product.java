package FurnitureShop.com.example.FurnitureShop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    private LocalDateTime createdAt = LocalDateTime.now();
}