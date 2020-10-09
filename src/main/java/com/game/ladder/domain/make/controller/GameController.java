package com.game.ladder.domain.make.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class GameController {

    @GetMapping("/")
    public String getStartProject(HttpServletRequest request) {
        return "game_start";
    }
}
