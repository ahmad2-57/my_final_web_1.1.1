//control

package com.example.firstWebApp.controles;
import com.example.firstWebApp.services.userServices;
import com.example.firstWebApp.entities.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@RestController
public class userController {

    @Autowired
    private userServices userServices;

    @PostMapping("/users/addUser")
    public @ResponseBody user addUser(@RequestBody user u)
    {
        return userServices.addUser(u);
    }

    @GetMapping("/users/getAll")
    public @ResponseBody ArrayList<user> getAll()
    {
        return userServices.getAll();
    }

    @GetMapping("/user/findUserId/{id}")
    public @ResponseBody Optional<user> findUserById(@PathVariable Long id)
    {
        return userServices.findUserById(id);
    }

    @GetMapping("/user/findUserIdByEmail")
    public Long findUserIdByEmail(@RequestParam String email) {
        Optional<user> user = this.userServices.findUserIdByEmail(email);
        if (user.isPresent()) {
            return user.get().getId();
        } else {
            return -1L; // يمكنك تغيير القيمة المُرجعة بما يناسب تطبيقك
        }
    }

    // Endpoint لتحديث معلومات المستخدم
    @PutMapping("/users/changePassword/{id}")
    public ResponseEntity<user> updateUserPassword(@RequestBody user userUpdateRequest, @PathVariable Long id) {
        String email = userUpdateRequest.getEmail();
        String phoneNumber = userUpdateRequest.getPhoneNumber();
        String password = userUpdateRequest.getPassword();
        Long userId = this.userServices.findUserIdByEmail(email).get().getId();
        if (userId != -1) {
            Optional<user> existingUser = userServices.findUserById(userId);
            if (existingUser.isPresent()) {
                user user = existingUser.get();
                if (user.getEmail().equals(email) && user.getPhoneNumber().equals(phoneNumber)) {
                    user savedUser = userServices.updateUserPassword(user, password);
                    return ResponseEntity.ok().body(savedUser); // تم التحديث بنجاح
                } else {
                    return ResponseEntity.badRequest().build(); // البريد الإلكتروني أو رقم الهاتف غير صحيح
                }
            } else {
                return ResponseEntity.notFound().build(); // لم يتم العثور على المستخدم
            }
        } else {
            return ResponseEntity.notFound().build(); // لم يتم العثور على المستخدم بالبريد الإلكتروني المعطى
        }
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String,String> u) {
        String email = u.get("email");
        String password = u.get("password");
        Map<String, Object> response = new HashMap<>();

        // استخدم UserService للتحقق من صحة معلومات تسجيل الدخول
        boolean isAuthenticated = userServices.authenticate(email, password);

        if (isAuthenticated) {
            Long userId = userServices.findUserIdByEmail(email).orElseThrow(() -> new RuntimeException("User not found")).getId();
            response.put("message", "تم تسجيل الدخول بنجاح!");
            response.put("id", userId);
            response.put("admen", true); // تأكد من تعيين هذه القيمة بناءً على دور المستخدم الفعلي
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


    @GetMapping("/user/data/{id}")
    public ResponseEntity<user> getUserById(@PathVariable Long id) {
        Optional<user> user = userServices.findUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<user> userOptional = userServices.findUserById(id);
        if (userOptional.isPresent()) {
            userServices.deleteUserById(id);
            return ResponseEntity.ok().body("تم حذف المستخدم بنجاح.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/correspondence/get/{userId}")
//    public ResponseEntity<List<Correspondence>> getCorrespondenceByUserId(@PathVariable Long userId) {
//        List<Correspondence> correspondenceList = userServices.getCorrespondenceByUserId(userId);
//        return ResponseEntity.ok().body(correspondenceList);
//    }
//
//    @PostMapping("/correspondence/save")
//    public ResponseEntity<String> saveCorrespondence(@RequestBody Correspondence correspondence) {
//        userServices.saveCorrespondence(correspondence.getUserId(), correspondence.userMessage(), correspondence.aiMessage());
//        return ResponseEntity.ok("Correspondence saved successfully.");
//    }

}
