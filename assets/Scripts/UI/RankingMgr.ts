import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class Ranking
{
    public id: number;
    public ranking: number;
}

@ccclass('RankingMgr')
export class RankingMgr extends Component
{
    private static _instance: RankingMgr = null;
    public static getInstance(): RankingMgr
    {
        if (!this._instance)
        {
            this._instance = new RankingMgr();
        }
        return this._instance;
    }

    public rankings: Array<Ranking> = [];

    /**Ä£ÄâÊý¾Ý */
    public initRankingsInfo(): void
    {
        for (let i: number = 0; i < 1000; i++)
        {
            let newRank: Ranking = new Ranking();
            newRank.id = i;
            newRank.ranking = i + 1;
            this.rankings.push(newRank);
        }
    }
}


