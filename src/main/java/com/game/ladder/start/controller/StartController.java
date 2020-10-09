package com.game.ladder.start.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class StartController {

    @GetMapping("/")
    public String getStartProject(HttpServletRequest request){
        return "gamestart_activity";
    }

    @PostMapping("/")
    public String postStartProject(HttpServletRequest request){
        return "gamestart_activity";
    }
}
