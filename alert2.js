'use strict';

class RedBlackTree {

	constructor(node) {
		this.node = node;
	}

	addNode(node, value) {

		if(node.value === value) {
			return false;
		} else {
			if(node.value > value) {
				if(node.leftChild != null) {
					let result = this.addNode(node.leftChild, value);
					return result;
				} else {
					node.leftChild = new Node(value, "red", null, null);
					return true;
				}
			} else {
				if(node.rightChild != null) {
					let result = this.addNode(node.rightChild, value);
					return result;
				} else {
					node.rightChild = new Node(value, "red", null, null);
					return true;
				}
			}
		}
	}
}

class Node {

	constructor(value, color, leftChild, rightChild) {
		this.value = value;
		this.color = color;
		this.leftChild = leftChild;
		this.rightChild =  rightChild;
	}

	static colorSwap(node) {
		node.rightChild.color = "black";
		node.leftChild.color = "black";
		node.color = "red";
	}
	
	static leftSwap(node) {
		let temp = node.rightChild.leftChild;
		let root = node.rightChild;
		root.leftChild = node;
		node.rightChild = temp;
		root.color = node.color;
		node.color = "red";
		return root;
	}
	
	static rightSwap(node) {
		let rightChild = node.leftChild.rightChild;
		let root = node.leftChild;
		node.leftChild = rightChild;
		root.rightChild = node;
		root.color = node.color;
		node.color = "red";
		return root;
	}
	
	static rebalance(node) {
		
		let needRebalance = true;
		do {

			if(node.leftChild != null) {
				node.leftChild = Node.rebalance(node.leftChild);
			}
			if(node.rightChild != null) {
				node.rightChild = Node.rebalance(node.rightChild);
			}

			needRebalance = false;
			if(node.leftChild?.color === "red" &&  node.leftChild?.leftChild?.color === "red") {
				needRebalance = true;
				node = Node.rightSwap(node);
			}
			if((node.rightChild?.color === "red" &&  node.leftChild?.color === "black") || 
			(node.rightChild?.color === "red" && node.leftChild == null)) {
				needRebalance = true;
				node = Node.leftSwap(node);
			}
			if(node.leftChild?.color === "red" && node.rightChild?.color === "red") {
				needRebalance = true;
				Node.colorSwap(node);
			}
			
		} while (needRebalance);

		

		return node;
	}
}


function showTree() {
	alert(JSON.stringify(tree.node));
};

function checkRootColor (node) {
	node.color === "black"? node.color = "black" : node.color = "black";
}

let tree = new RedBlackTree(new Node(25, "black", null, null));
tree.addNode(tree.node,5);
tree.node = Node.rebalance(tree.node);
checkRootColor(tree.node);
showTree();
tree.addNode(tree.node, 1);
tree.node = Node.rebalance(tree.node);
checkRootColor(tree.node);
showTree();
tree.addNode(tree.node, 15);
tree.node = Node.rebalance(tree.node);
checkRootColor(tree.node);
showTree();
tree.addNode(tree.node, 3);
tree.node = Node.rebalance(tree.node);
checkRootColor(tree.node);
showTree();
tree.addNode(tree.node, 8);
tree.node = Node.rebalance(tree.node);
checkRootColor(tree.node);
showTree();
