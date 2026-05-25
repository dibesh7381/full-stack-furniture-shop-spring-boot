package FurnitureShop.com.example.FurnitureShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartResponseDto {

    private Long cartId;

    private Long productId;

    private String productType;

    private String imageUrl;

    private Double price;

    private Integer quantity;

    private Integer stock;

    private Double totalPrice;
}
