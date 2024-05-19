//userServices

package com.example.firstWebApp.services;

import com.example.firstWebApp.entities.user;
import com.example.firstWebApp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class userServices {
    @Autowired
    private userRepository repository;

    public user addUser(user u)
    {
        return repository.save(u);
    }

    public ArrayList<user> getAll() {
        return (ArrayList<user>) repository.findAll();
    }

    public Optional<user> findUserById(Long id)
    {
        return repository.findById(id);
    }

    public void deleteUserById(Long id) {
        repository.deleteById(id);
    }


    public user updateUserPassword(user user, String newPassword) {
    user.setPassword(newPassword);
    return repository.save(user);
}

    public Optional<user> findUserIdByEmail(String email)
    {
        return this.repository.findUserIdByEmail(email);
    }

    public boolean authenticate(String email, String password) {
        Optional<user> optionalUser = this.repository.findByEmailAndPassword(email,password);
        if (optionalUser.isPresent()) {
            user user = optionalUser.get();
            // التحقق مما إذا كانت كلمة المرور متطابقة
            return user.getPassword().equals(password);
        }
        return false;
    }
//    public List<Correspondence> getCorrespondenceByUserId(Long userId) {
//        return correspondenceRepository.findByUserId(userId);
//    }
//
//    public void saveCorrespondence(Long userId, String sender, String message) {
//        Correspondence correspondence = new Correspondence(userId, sender, message, new Date());
//        correspondenceRepository.save(correspondence);
//    }

}
