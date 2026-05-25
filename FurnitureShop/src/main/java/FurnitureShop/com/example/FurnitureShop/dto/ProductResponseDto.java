package FurnitureShop.com.example.FurnitureShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDto {

    private Long id;

    private String type;

    private Integer stock;

    private Double price;

    private String imageUrl;

    private Long sellerId;

    private String sellerName;

    private LocalDateTime createdAt;
}
