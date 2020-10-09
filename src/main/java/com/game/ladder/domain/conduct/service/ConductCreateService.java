package com.game.ladder.domain.conduct.service;

import com.game.ladder.domain.conduct.dto.response.SettingResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Service
public class ConductCreateService {

    public ModelAndView conductViewCreate(Map<String, String> params, Model model, HttpSession session){
        String userCount = params.get("userCount");

        session.setAttribute("userCount",userCount);
        ModelAndView view = new ModelAndView();
        view.setViewName("gameconduct_activity");
        view.addObject("userCount",userCount);
        view.addObject("setting",SettingResponse.toDto(params));
        return view;
    }
}
