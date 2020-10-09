package com.game.ladder.common.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class SettingResponse {
    private String setting1;
    private String setting2;
    private String setting3;
    private String setting4;

    public static SettingResponse toDto(Map<String, String> params){
        return SettingResponse.builder()
                .setting1(params.get("text1"))
                .setting2(params.get("text2"))
                .setting3(params.get("text3"))
                .setting4(params.get("text4"))
                .build();
    }

    public static SettingResponse toDto(List<String> settingList){
        return SettingResponse.builder()
                .setting1(settingList.get(0))
                .setting2(settingList.get(1))
                .setting3(settingList.get(2))
                .setting4(settingList.get(3))
                .build();
    }
}
