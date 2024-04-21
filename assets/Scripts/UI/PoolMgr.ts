import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PoolMgr')
export class PoolMgr extends Component
{
    private static _instance: PoolMgr = null;
    public static getInstance(): PoolMgr
    {
        if (!this._instance)
        {
            this._instance = new PoolMgr();
        }
        return this._instance;
    }

    private pool: Array<Node> = [];

    /**�������� */
    public createObject(prefab: Prefab): Node
    {
        let node: Node;
        if (this.pool.length > 0)
        {
            // ��������ж��󣬸��ó��еĶ���
            node = this.pool.pop()!;
            node.active = true;
        }
        else
        {
            // ����û�ж��󣬴����¶���
            node = instantiate(prefab);
        }
        return node;
    }

    /**���ն��� */
    public recycleObject(node: Node): void
    {
        node.active = false;
        //node.parent = null;
        this.pool.push(node);
    }

    /**��ȡ�صĴ�С */
    get size(): number
    {
        return this.pool.length;
    }
}


