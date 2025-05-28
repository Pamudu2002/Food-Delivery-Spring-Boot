package sl.pamuduchandeepa.foodiesapi.service;

import org.springframework.web.multipart.MultipartFile;
import sl.pamuduchandeepa.foodiesapi.io.FoodRequest;
import sl.pamuduchandeepa.foodiesapi.io.FoodResponse;

public interface FoodService {

    String uploadFile(MultipartFile file);
    FoodResponse addFood(FoodRequest request, MultipartFile file);
}
