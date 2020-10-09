package com.game.ladder.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class CommonController {
    @PostMapping("/userCount")
    @ResponseBody
    public String settingNext(HttpServletRequest request){
        return String.valueOf(request.getSession().getAttribute("userCount"));
    }
}
