package com.game.ladder.common.factory;

import com.game.ladder.common.factory.dto.LadderInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class LadderFactory {

    private final List<List<LadderInfoDto>> candidate;

    /**
     * 사다리 후보군을 생성
     * @param r : 행의 번호
     * @param c : 열의 번호
     * @param map : 지금까지 만들어진 사다리의 정보를 저장
     * @param maxRow : 만들어져야 하는 행의 숫자
     * @param maxCol : 만들어져야 하는 열의 숫자
     * @return : 사다리 후보군
     */
    public List<List<LadderInfoDto>> ladderCreate(int r, int c, int[][] map, int maxRow, int maxCol){
        this.initializCandition();
        this.ladderCreateCalc(r,c,map,maxRow,maxCol);
        return this.candidate;
    }

    /**
     * 후보군을 저장하는 리스트를 초기화 시킴
     */
    private void initializCandition(){
        this.candidate.clear();
    }

    /**
     * 사다리를 생성하기 위하여 dfs 시뮬레이션을 수행하는 메소드
     * @param r : 행의 번호
     * @param c : 열의 번호
     * @param map : 지금까지 만들어진 사다리의 정보를 저장
     * @param maxRow : 만들어져야 하는 행의 숫자
     * @param maxCol : 만들어져야 하는 열의 숫자
     */
    private void ladderCreateCalc(int r, int c, int[][] map,int maxRow, int maxCol) {
        if (r == (maxRow - 1) && c == (maxCol - 1)) {
            //시뮬레이션을 통과해야 후보군에 저장
            if (simulate(map, maxRow, maxCol)) {
                List<LadderInfoDto> insert = new ArrayList<>();
                for (int i = 0; i < maxRow; i++) {
                    for (int j = 0; j < maxCol; j++) {
                        if (map[i][j] == 1) {
                            LadderInfoDto ladderInfoResponse = new LadderInfoDto(i, j);
                            insert.add(ladderInfoResponse);
                        }
                    }
                }
                //최종 후보군에 저장
                this.candidate.add(insert);
            }
            return;
        }

        if (c == 0) {
            //해당 지점에 사다리를 놓는 경우
            map[r][c] = 1;
            ladderCreateCalc(r, c + 1, map, maxRow, maxCol);
            map[r][c] = 0;

            //해당 지점에 사다리를 놓지 않는 경우
            map[r][c] = 0;
            ladderCreateCalc(r, c + 1, map, maxRow, maxCol);
            map[r][c] = 0;
        } else if (c == (maxCol - 1)) {
            ladderCreateCalc(r + 1, 0, map, maxRow, maxCol);

        } else {
            //사다리를 놓을 수 있음
            if (map[r][c - 1] == 0) {
                //해당 지점에 사다리를 놓는 경우
                map[r][c] = 1;
                ladderCreateCalc(r, c + 1, map, maxRow, maxCol);
                map[r][c] = 0;

                //해당 지점에 사다리를 놓지 않는 경우
                map[r][c] = 0;
                ladderCreateCalc(r, c + 1, map, maxRow, maxCol);
                map[r][c] = 0;
            }
            //사다리를 놓을 수 없음
            else {
                map[r][c] = 0;
                ladderCreateCalc(r, c + 1, map, maxRow, maxCol);
                map[r][c] = 0;
            }
        }
    }

    /**
     *
     * @param map : 만들어진 사다리가 유효한 사다리인지 판별하는 함수
     * @param maxRow : 만들어져야 하는 행의 숫자
     * @param maxCol : 만들어져야 하는 열의 숫자
     * @return : 유효한 사다리일 경우 참을 반환
     */
    private boolean simulate(int[][] map,int maxRow, int maxCol){
        int[] check = new int[4];//초기값은 0, 유저가 도착하면 1의 값
        int currentLocation = 0;

        //check을 초기화
        Arrays.fill(check,0);

        for(int i = 0; i < maxCol; i++){
            currentLocation = i;
            //사다리를 타기 시작
            for(int j = 0 ; j < maxRow; j++){
                //양쪽을 조사
                if(currentLocation != 0 && currentLocation != (maxCol-1)){
                    if(map[j][currentLocation] == 1){
                        currentLocation += 1;
                    }
                    else if(map[j][currentLocation-1] == 1){
                        currentLocation -= 1;
                    }
                }
                //오른쪽을 조사
                else if(currentLocation == 0){
                    if(map[j][currentLocation] == 1){
                        currentLocation += 1;
                    }
                }
                //왼쪽을 조사
                else if(currentLocation == (maxCol-1)){
                    if(map[j][currentLocation-1] == 1){
                        currentLocation -= 1;
                    }
                }
            }

            //사다리를 다 타고 내려온 후의 상태를 확인
            if(check[currentLocation] == 1){
                return false;
            }
            else{
                check[currentLocation] = 1;
            }
        }
        return true;
    }
}
