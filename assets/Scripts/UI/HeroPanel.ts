import { _decorator, Button, Component, Node, Animation, Sprite, SpriteFrame, tween, Vec3, Skeleton, JsonAsset, sp, Label } from 'cc';
import { UIManager, E_PanelType } from './UIManager';
import { BasePanel } from './BasePanel';
const { ccclass, property } = _decorator;

@ccclass('HeroPanel')
export class HeroPanel extends BasePanel
{
    @property(Animation)
    public anim: Animation = null;

    @property([SpriteFrame])
    public thinkingObjs: SpriteFrame[] = [];
    private nowThinkingIndex = 0;
    @property(Sprite)
    public thinkingObj: Sprite = null;

    @property(Button)
    public button_hero1: Button = null;
    @property(Button)
    public button_hero2: Button = null;
    @property(Button)
    public button_hero3: Button = null;
    @property(Button)
    public btn_Back: Button = null;

    @property(Label)
    public heroName: Label = null;
    @property(Label)
    public heroLevel: Label = null;

    @property([Node])
    public selectBgs: Node[] = [];

    @property(sp.Skeleton)
    public skeleton: sp.Skeleton = null;
    @property([sp.SkeletonData])
    public skeletonDatas: sp.SkeletonData[] = [];


    protected onLoad(): void
    {
        UIManager.getInstance().addPanel(E_PanelType.HeroPanel, this);
    }

    start()
    {
        this.rigisterButtonEvent();
        this.setActiveFalse();
    }

    public showPanel(): void
    {
        this.node.active = true;
        this.anim.play('heroPanel_in');
        this.switchHero(0);
        this.schedule(this.changeThinkingObj, 3);
    }

    public hidePanel(): void
    {
        this.anim.play('heroPanel_out');
        this.unschedule(this.changeThinkingObj);
    }

    public setActiveFalse(): void
    {
        this.node.active = false;
    }

    private changeThinkingObj(): void
    {
        this.nowThinkingIndex++;
        this.nowThinkingIndex = this.nowThinkingIndex >= this.thinkingObjs.length ? 0 : this.nowThinkingIndex;
        this.thinkingObj.spriteFrame = this.thinkingObjs[this.nowThinkingIndex];
        this.thinkingObj.node.setScale(new Vec3(0, 0, 0));
        tween(this.thinkingObj.node).to(0.15, { scale: new Vec3(1, 1, 1) }).start();
    }

    private rigisterButtonEvent(): void
    {
        this.button_hero1.node.on(Button.EventType.CLICK, () =>
        {
            this.switchHero(0);
        }, this);
        this.button_hero2.node.on(Button.EventType.CLICK, () =>
        {

            this.switchHero(1);
        }, this);
        this.button_hero3.node.on(Button.EventType.CLICK, () =>
        {
            this.switchHero(2);
        }, this);
        this.btn_Back.node.on(Button.EventType.CLICK, () =>
        {
            UIManager.getInstance().hidePanel(E_PanelType.HeroPanel);
        }, this);
    }

    private switchHero(index: number): void
    {
        this.resetAllHero();
        this.skeleton.skeletonData = this.skeletonDatas[index];
        switch (index)
        {
            case 0:
                this.skeleton.animation = 'idle';
                this.button_hero1.node.getChildByName('bg_select').active = true;
                this.heroName.string = '勇者兔';
                this.heroLevel.string = 'Lv.9';
                this.button_hero1.node.scale = new Vec3(1.1, 1.1, 1);
                break;
            case 1:
                this.skeleton.animation = 'idle';
                this.button_hero2.node.getChildByName('bg_select').active = true;
                this.heroName.string = '熊大厨';
                this.heroLevel.string = 'Lv.3';
                this.button_hero2.node.scale = new Vec3(1.1, 1.1, 1);
                break;
            case 2:
                this.skeleton.animation = 'idle';
                this.button_hero3.node.getChildByName('bg_select').active = true;
                this.heroName.string = '魔法鸭';
                this.heroLevel.string = 'Lv.12';
                this.button_hero3.node.scale = new Vec3(1.1, 1.1, 1);
                break;
            default:
                break;
        }
    }

    private resetAllHero(): void
    {
        this.button_hero1.node.getChildByName('bg_select').active = false;
        this.button_hero2.node.getChildByName('bg_select').active = false;
        this.button_hero3.node.getChildByName('bg_select').active = false;
        this.button_hero1.node.scale = new Vec3(1, 1, 1);
        this.button_hero2.node.scale = new Vec3(1, 1, 1);
        this.button_hero3.node.scale = new Vec3(1, 1, 1);
    }
}