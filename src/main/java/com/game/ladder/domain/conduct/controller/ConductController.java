package com.game.ladder.domain.conduct.controller;

import com.game.ladder.common.factory.dto.LadderInfoDto;
import com.game.ladder.domain.conduct.service.ConductCreateService;
import com.game.ladder.domain.conduct.service.ConductGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ConductController {

    private final ConductCreateService conductCreateService;

    private final ConductGetService conductGetService;

    @PostMapping("/create/ladder")
    @ResponseBody
    public List<LadderInfoDto> simulateLadder(HttpServletRequest request){
        return conductGetService.getLadderInformation(request.getSession());
    }

    @PostMapping("start/next")
    public ModelAndView action(@RequestParam Map<String, String> params,HttpServletRequest request){
        return conductCreateService.conductViewCreate(params,request.getSession());
    }

}
