import { _decorator, Component, Node } from 'cc';
import { BasePanel } from './BasePanel';
const { ccclass, property } = _decorator;

export enum E_PanelType { MainPanel, HeroPanel, FriendPanel };

@ccclass('UIManager')
export class UIManager extends Component
{
    private static _instance: UIManager = null;
    public static getInstance(): UIManager
    {
        if (!this._instance)
        {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    public panels: Map<E_PanelType, BasePanel> = new Map<E_PanelType, BasePanel>();

    public addPanel(panelType: E_PanelType, panel: BasePanel): void 
    {
        if (!this.panels[panelType])
        {
            this.panels[panelType] = panel;
        }
    }

    public showPanel(panelType: E_PanelType)
    {
        if (this.panels[panelType])
        {
            this.panels[panelType].showPanel();
        }
    }

    public hidePanel(panelType: E_PanelType)
    {
        if (this.panels[panelType])
        {
            this.panels[panelType].hidePanel();
        }
    }
}