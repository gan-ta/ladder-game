package com.game.ladder.domain.conduct.service;

import com.game.ladder.common.factory.LadderFactory;
import com.game.ladder.common.factory.dto.LadderInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConductGetService {

    private final LadderFactory ladderFactory;

    /**
     * 유저의 수에 따라서 사다리의 수직과 수평선의 정보를 계산
     * @param session : 세션
     * @return : 사다리의 수평선과 수직선의 정보의 리스트를 반환
     */
    public List<LadderInfoDto> getLadderInformation(HttpSession session){
        int userCount = Integer.parseInt(String.valueOf(session.getAttribute("userCount")));

        //연결 상태의 정보를 저장하는 Map의 생성
        int[][] map = new int[userCount+3][userCount];
        //map을 초기화
        for(int[] row:map) Arrays.fill(row,0);

        List<List<LadderInfoDto>> result = ladderFactory.ladderCreate(0,0,map,userCount+3,userCount);
        return result.get((int) (Math.random() * result.size()));
    }

}
