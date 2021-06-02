package ro.marathon.commonAPI.users;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
}