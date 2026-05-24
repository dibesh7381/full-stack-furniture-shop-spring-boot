package FurnitureShop.com.example.FurnitureShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponseDto<T> {

    private boolean success;

    private String message;

    private T data;
}