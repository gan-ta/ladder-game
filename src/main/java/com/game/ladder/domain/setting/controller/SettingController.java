package com.game.ladder.domain.setting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class SettingController {
    @GetMapping("/start")
    public String getStartGame(HttpServletRequest request){
        return "gamesetting_activity";
    }

    @PostMapping("/start")
    public String postStartGame(HttpServletRequest request){return "gamesetting_activity";}

    @PostMapping("/start/setting")
    @ResponseBody
    public int countUser(@RequestParam("userCount") String userCount,HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("userCount",userCount);

        return Integer.parseInt(userCount);
    }
}
