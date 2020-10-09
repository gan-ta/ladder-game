package com.game.ladder.domain.conduct.service;

import com.game.ladder.common.dto.response.SettingResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Service
public class ConductCreateService {

    /**
     * 게임 수행 뷰 생성
     * (최종적으로 정해진 유저의 수를 저장)
     * @param params : 뷰에서 온 파라키터
     * @param session : 세션
     * @return 게임 수행 뷰
     */
    public ModelAndView conductViewCreate(Map<String, String> params, HttpSession session){
        String userCount = params.get("userCount");

        session.setAttribute("userCount",userCount);
        ModelAndView view = new ModelAndView();
        view.setViewName("game_conduct_activity");
        view.addObject("setting",SettingResponse.toDto(params));
        return view;
    }
}
