package sl.pamuduchandeepa.foodiesapi.service;

import org.springframework.web.multipart.MultipartFile;
import sl.pamuduchandeepa.foodiesapi.io.FoodRequest;
import sl.pamuduchandeepa.foodiesapi.io.FoodResponse;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFile(String fileName );

    void deleteFood(String id);

}
