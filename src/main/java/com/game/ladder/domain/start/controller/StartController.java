package com.game.ladder.domain.start.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class StartController {

    @GetMapping("/")
    public String getStartProject(){
        return "game_start_activity";
    }

    @PostMapping("/")
    public String postStartProject(){
        return "game_start_activity";
    }
}
