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

    /**创建对象 */
    public createObject(prefab: Prefab): Node
    {
        let node: Node;
        if (this.pool.length > 0)
        {
            // 如果池中有对象，复用池中的对象
            node = this.pool.pop()!;
            node.active = true;
        }
        else
        {
            // 池中没有对象，创建新对象
            node = instantiate(prefab);
        }
        return node;
    }

    /**回收对象 */
    public recycleObject(node: Node): void
    {
        node.active = false;
        //node.parent = null;
        this.pool.push(node);
    }

    /**获取池的大小 */
    get size(): number
    {
        return this.pool.length;
    }
}


