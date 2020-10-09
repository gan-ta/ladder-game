package com.game.ladder.domain.result.controller;

import com.game.ladder.domain.result.service.ResultCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ResultController {

    private final ResultCreateService resultCreateService;

    @PostMapping("/result")
    public ModelAndView result(@RequestParam Map<String, String> params, HttpServletRequest request){
        return resultCreateService.resultViewCreate(params,request.getSession());
    }
}
