import { _decorator, Component, Node, Animation, Button, UITransform, Vec2, Prefab, Vec3 } from 'cc';
import { BasePanel } from './BasePanel';
import { E_PanelType, UIManager } from './UIManager';
import { RankingMgr } from './RankingMgr';
import { PoolMgr } from './PoolMgr';
import { PlayerRank } from './PlayerRank';
const { ccclass, property } = _decorator;

@ccclass('FriendPanel')
export class FriendPanel extends BasePanel
{
    @property(Animation)
    public anim: Animation = null;

    @property(Button)
    public btn_back: Button = null;
    @property(Button)
    public btn_backbg: Button = null;

    @property(Node)
    public rankingContent: Node = null;
    @property(Node)
    public rankingViewPort: Node = null;

    @property(Prefab)
    public rankingPrefab: Prefab = null;
    /**当前显示的ranking对象 */
    private _nowShowRankings: Map<number, Node> = new Map<number, Node>();
    //记录上一次显示索引范围
    private _oldMinIndex: number = -1;
    private _oldMaxIndex: number = -1;
    private _rankingContentAnchoredPoint: number = 0;
    private _rankingContentAnchoredPos: number = 0;
    private _viewPortH: number = 0;


    protected onLoad(): void
    {
        UIManager.getInstance().addPanel(E_PanelType.FriendPanel, this);
    }

    start()
    {
        this.rigisterButtonEvent();
        this.setActiveFalse();
        this._rankingContentAnchoredPoint = this.rankingContent.getPosition().y;
    }

    update(deltaTime: number)
    {
        this.checkShowOrHide();
    }

    public showPanel(): void
    {
        this.node.active = true;
        this.anim.play('friendPanel_in');
        RankingMgr.getInstance().initRankingsInfo();
        this.rankingContent.getComponent(UITransform).setContentSize(this.rankingContent.getComponent(UITransform).contentSize.width
            , RankingMgr.getInstance().rankings.length * 180);
        this._viewPortH = this.rankingViewPort.getComponent(UITransform).contentSize.y;
    }
    public hidePanel(): void
    {
        this.anim.play('friendPanel_out');
    }

    private checkShowOrHide(): void
    {
        this._rankingContentAnchoredPos = this.rankingContent.getPosition().y - this._rankingContentAnchoredPoint;
        //拖到顶直接返回
        if (this._rankingContentAnchoredPos < 0)
        {
            return;
        }
        let minIndex: number = Math.floor(this._rankingContentAnchoredPos / 180);
        let maxIndex: number = Math.floor((this._rankingContentAnchoredPos + this._viewPortH) / 180);
        //避免超出数量
        if (maxIndex >= RankingMgr.getInstance().rankings.length)
        {
            maxIndex = RankingMgr.getInstance().rankings.length - 1;
        }
        //下拉时删除上面的
        for (let i: number = this._oldMinIndex; i < minIndex; i++)
        {
            if (this._nowShowRankings.has(i))
            {
                if (this._nowShowRankings[i] != null)
                {
                    PoolMgr.getInstance().recycleObject(this._nowShowRankings[i]);
                }
                this._nowShowRankings.delete(i);
            }
        }
        //上拉时删除上面的
        for (let i: number = maxIndex + 1; i <= this._oldMaxIndex; i++)
        {
            if (this._nowShowRankings.has(i))
            {
                if (this._nowShowRankings[i] != null)
                {
                    PoolMgr.getInstance().recycleObject(this._nowShowRankings[i]);
                }
                this._nowShowRankings.delete(i);
            }
        }
        this._oldMinIndex = minIndex;
        this._oldMaxIndex = maxIndex;
        //创建指定索引范围的格子
        for (let i: number = minIndex; i <= maxIndex; i++)
        {
            if (this._nowShowRankings.has(i))
            {
                continue;
            }
            else
            {
                let index: number = i;
                this._nowShowRankings.set(index, null);
                let newRanking: Node = PoolMgr.getInstance().createObject(this.rankingPrefab);
                newRanking.setParent(this.rankingContent);
                newRanking.setPosition(new Vec3(0, -index * 180));
                newRanking.getComponent(PlayerRank).initRankInfo(RankingMgr.getInstance().rankings[i]);
                if (this._nowShowRankings.has(i))
                {
                    this._nowShowRankings[i] = newRanking;
                }
            }
        }
    }

    public setActiveFalse(): void
    {
        this.node.active = false;
    }

    private rigisterButtonEvent(): void
    {
        this.btn_back.node.on(Button.EventType.CLICK, () =>
        {
            UIManager.getInstance().hidePanel(E_PanelType.FriendPanel);
        }, this);
        this.btn_backbg.node.on(Button.EventType.CLICK, () =>
        {
            UIManager.getInstance().hidePanel(E_PanelType.FriendPanel);
        }, this);
    }
}


