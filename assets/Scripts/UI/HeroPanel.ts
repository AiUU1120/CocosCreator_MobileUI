import { _decorator, Button, Component, Node, Animation } from 'cc';
import { UIManager, E_PanelType } from './UIManager';
import { BasePanel } from './BasePanel';
const { ccclass, property } = _decorator;

@ccclass('HeroPanel')
export class HeroPanel extends BasePanel
{
    @property(Animation)
    public anim: Animation;

    @property(Button)
    public btn_Back: Button;

    protected onLoad(): void
    {
        UIManager.getInstance().addPanel(E_PanelType.HeroPanel, this);
    }

    start()
    {
        this.btn_Back.node.on(Button.EventType.CLICK, () =>
        {
            UIManager.getInstance().hidePanel(E_PanelType.HeroPanel);
        }, this);
        this.hidePanel();
    }

    public showPanel(): void
    {
        this.node.active = true;
        this.anim.play('heroPanel_in');
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


