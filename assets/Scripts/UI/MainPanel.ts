import { _decorator, Component, Node, Animation, Button } from 'cc';
import { BasePanel } from './BasePanel';
import { E_PanelType, UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('MainPanel')
export class MainPanel extends BasePanel
{
    @property(Animation)
    public anim: Animation;

    @property(Button)
    public btnHero: Button;

    protected onLoad(): void
    {
        UIManager.getInstance().addPanel(E_PanelType.MainPanel, this);
    }

    start()
    {
        this.showPanel();
        this.btnHero.node.on(Button.EventType.CLICK, () => { UIManager.getInstance().showPanel(E_PanelType.HeroPanel) }, this);
    }

    update(deltaTime: number)
    {

    }

    public showPanel(): void
    {
        this.anim.play('mainPanel_in');
    }

    public hidePanel(): void
    {
        this.setActiveFalse();
    }

    public setActiveFalse(): void
    {
        this.node.active = false;
    }
}


