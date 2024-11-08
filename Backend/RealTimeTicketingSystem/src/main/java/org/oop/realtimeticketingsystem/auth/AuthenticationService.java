package org.oop.realtimeticketingsystem.auth;

import org.oop.realtimeticketingsystem.securityconfig.JwtService;
import org.oop.realtimeticketingsystem.user.Role;
import org.oop.realtimeticketingsystem.user.User;
import org.oop.realtimeticketingsystem.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        log.debug("Registering user with username: {}", request.getUserName());
        if(userRepository.findByUserName(request.getUserName()).isPresent()){
            log.debug("Username already exist");
            return AuthenticationResponse.builder()
                    .status("userName already exist")
                    .build();
        }
        else {
            log.debug("Registering user with username: {}", request.getUserName());
            var user = User.builder()
                    .userName(request.getUserName())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            var savedUser = userRepository.save(user);
            log.debug("User registered successfully with username: {}", request.getUserName());

            log.debug("Generating token for user with username: {}", request.getUserName());
            var jwtToken = jwtService.generateToken(user);
            log.debug("Token generated successfully for user with username: {}", request.getUserName());

            log.debug("Returning response for user with username: {}", request.getUserName());
            return AuthenticationResponse.builder()
                    .userId(savedUser.getUserId().toString())
                    .token(jwtToken)
                    .status("User Registered Successfully")
                    .build();

        }
    }

    public AuthenticationResponse login(LoginRequest request) {
        log.debug("Logging in user with username: {}", request.getUserName());
        log.debug("Checking if user with username: {} exists", request.getUserName());
        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            log.debug("User with username: {} exists", request.getUserName());
            var user = userRepository.findByUserName(request.getUserName()).get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                log.debug("User with username: {} logged in successfully", request.getUserName());
                var jwtToken = jwtService.generateToken(user);
                log.debug("Token generated successfully for user with username: {}", request.getUserName());
                return AuthenticationResponse.builder()
                        .userId(user.getUserId().toString())
                        .token(jwtToken)
                        .status("Login Successful")
                        .build();
            } else {
                log.debug("Invalid credentials for user with username: {}", request.getUserName());
                return AuthenticationResponse.builder()
                        .status("Invalid Credentials")
                        .build();
            }
        }else {
            log.debug("User with username: {} not found", request.getUserName());
            return AuthenticationResponse.builder()
                    .status("User not found")
                    .build();
        }
    }
}
