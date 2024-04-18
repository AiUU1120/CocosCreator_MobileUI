import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BasePanel')
export abstract class BasePanel extends Component
{
    public abstract showPanel(): void;
    public abstract hidePanel(): void;
}


