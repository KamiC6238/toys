// 祖先的定义： 若节点 pp 在节点 rootroot 的左（右）子树中，或 p = rootp=root ，则称 rootroot 是 pp 的祖先。

// 最近公共祖先的定义：
// 设节点 rootroot 为节点 p, qp,q 的某公共祖先，
// 若其左子节点 root.leftroot.left 和右子节点 root.rightroot.right 都不是 p,qp,q 的公共祖先，
// 则称 rootroot 是 “最近的公共祖先” 。

// 剑指offer-68
function lowestCommonAncestor (root, p, q) {
  if (!root) return null

  // 自己可以是自己的祖先
  if (root === p || root === q) {
    return root
  }

  // 在左子树中寻找 p 或者 q，先找到谁就返回谁
  let left = lowestCommonAncestor(root.left, p, q)
  // 在右子树中寻找 p 或者 q，先找到谁就返回谁
  let right = lowestCommonAncestor(root.right, p, q)
 
  // 如果左子树为 null，说明 p 跟 q 都在右子树中，此时先被找到的为 p 跟 q 的最近公共祖先
  if (!left) return right
  // 如果右子树为 null，说明 p 跟 q 都在左子树中，此时先被找到的为 p 跟 q 的最近公共祖先
  if (!right) return left

  // 如果 left 跟 right 都存在，说明 p 跟 q 分别在左右子树中，此时根节点 root 就是它们的最近公共祖先
  return root
}