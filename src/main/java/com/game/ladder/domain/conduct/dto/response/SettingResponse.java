package com.game.ladder.domain.conduct.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class SettingResponse {
    String setting1;
    String setting2;
    String setting3;
    String setting4;

    public static SettingResponse toDto(Map<String, String> params){
        return SettingResponse.builder()
                .setting1(params.get("text1"))
                .setting2(params.get("text2"))
                .setting3(params.get("text3"))
                .setting4(params.get("text4"))
                .build();
    }
}
