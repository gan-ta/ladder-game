package com.game.ladder.domain.result.service;

import com.game.ladder.common.dto.response.SettingResponse;
import com.game.ladder.domain.result.dto.response.ResultResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ResultCreateService {

    /**
     * 게임 결과 뷰 생성
     * @param params : 파라미터
     * @param session : 세션
     * @return 게임 결과 뷰
     */
    public ModelAndView resultViewCreate(Map<String, String> params, HttpSession session){
        ModelAndView view = new ModelAndView();
        List<String> resultArr = new ArrayList<String>();

        int userCount = Integer.parseInt(String.valueOf(session.getAttribute("userCount")));
        resultArr.add(params.get("text1"));
        resultArr.add(params.get("text2"));
        resultArr.add(params.get("text3"));
        resultArr.add(params.get("text4"));

        if(userCount == 4) {
            view.addObject("result",ResultResponse.builder()
            .result1(resultArr.get(Integer.parseInt(params.get("result1")) - 1))
            .result2(resultArr.get(Integer.parseInt(params.get("result2")) - 1))
            .result3(resultArr.get(Integer.parseInt(params.get("result3")) - 1))
            .result4(resultArr.get(Integer.parseInt(params.get("result4")) - 1))
                    .build());
        }
        else if(userCount == 3){
            view.addObject("result",ResultResponse.builder()
                    .result1(resultArr.get(getTransisionResult(Integer.parseInt(params.get("result1")) - 1)))
                    .result2(resultArr.get(getTransisionResult(Integer.parseInt(params.get("result2")) - 1)))
                    .result3(resultArr.get(getTransisionResult(Integer.parseInt(params.get("result3")) - 1)))
                    .build());
        }
        else if(userCount == 2){
            view.addObject("result",ResultResponse.builder()
                    .result1(resultArr.get(Integer.parseInt(params.get("result1")) - 1))
                    .result2(resultArr.get(Integer.parseInt(params.get("result2")) - 1))
                    .build());
        }

        view.addObject("resultBottom",SettingResponse.toDto(resultArr));

        view.setViewName("game_result_activity");
        view.addObject("userCount",userCount);
        return view;
    }

    /**
     * 유저가 3명일 때 박스 배치가 다르기 떄문에 이에 따라 전환하는 로직
     * (결과 박스의 배치가 다르기 때문)
     * @param num : 실제 매칭된 결과 번호
     * @return : 박스 배치로 인하여 변환이 된 결과 번호
     */
    private int getTransisionResult(int num){
        if(num == 0){
            return 0;
        }
        else if(num == 1){
            return 2;
        }
        else if(num == 2){
            return 3;
        }
        return -1;
    }
}
