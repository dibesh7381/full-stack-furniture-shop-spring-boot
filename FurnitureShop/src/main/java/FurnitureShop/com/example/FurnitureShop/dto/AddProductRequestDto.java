package FurnitureShop.com.example.FurnitureShop.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddProductRequestDto {

    private String type;

    private Integer stock;

    private Double price;

    private MultipartFile image;
}
