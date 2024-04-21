import { _decorator, Component, Label, Node } from 'cc';
import { Ranking } from './RankingMgr';
const { ccclass, property } = _decorator;

@ccclass('PlayerRank')
export class PlayerRank extends Component
{
    @property(Label)
    public lab_ranking: Label = null;
    @property(Label)
    public lab_name: Label = null;
    @property(Label)
    public lab_level: Label = null;
    @property(Label)
    public lab_wave: Label = null;

    public initRankInfo(rankingInfo: Ranking)
    {
        let ranking: number = rankingInfo.ranking;
        this.lab_ranking.string = ranking.toString();
        this.lab_name.string = 'player' + ranking.toString();
        this.lab_level.string = (ranking % 7).toString();
        this.lab_wave.string = (ranking % 5).toString();
    }
}


