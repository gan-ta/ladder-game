package com.game.ladder.domain.start.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class StartController {

    @GetMapping("/")
    public String getStartProject(){
        return "gamestart_activity";
    }

    @PostMapping("/")
    public String postStartProject(){
        return "gamestart_activity";
    }
}
