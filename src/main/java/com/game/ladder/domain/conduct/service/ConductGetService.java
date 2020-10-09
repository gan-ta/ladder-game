package com.game.ladder.domain.conduct.service;

import com.game.ladder.common.factory.LadderFactory;
import com.game.ladder.common.factory.dto.LadderInfoDto;
import com.game.ladder.domain.conduct.dto.response.SettingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConductGetService {

    private final LadderFactory ladderFactory;

    /**
     * 유저의 수에 따라서 사다리의 수직과 수평선의 정보를 계산
     * @param userCount : 현재 게임 참여자의 수
     * @return : 사다리의 수평선과 수직선의 정보의 리스트를 반환
     */
    public List<LadderInfoDto> getLadderInformation(int userCount){
        //연결 상태의 정보를 저장하는 Map의 생성
        int[][] map = new int[userCount+3][userCount];
        //map을 초기화
        for(int[] row:map) Arrays.fill(row,0);

        List<List<LadderInfoDto>> result = ladderFactory.ladderCreate(0,0,map,userCount+3,userCount);
        return result.get((int) (Math.random() * result.size()));
    }

}
