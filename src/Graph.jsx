function createGraph(width, height) {
    let graph = [[]]
    for (let col = 0; col < width; col++) {
        graph[col] = []
        for (let row = 0; row < height; row++) {
            graph[col][row] = []
            let currentNode = graph[col][row]
            currentNode.row = row
            currentNode.col = col
            currentNode.isVisited = false
            currentNode.distance = Infinity
            currentNode.previous = null
        }
    }
    return graph
}

function nodesNotVisitedFromGivenNode(graph, node, width, height) {
    let nodes = []

    if (node.row - 1 >= 0 && node.col >= 0) {
        let top = graph[node.col][node.row - 1]
        if (!top.isVisited) nodes.push(top)
    }
    if (node.col - 1 >= 0 && node.row >= 0) {
        let left = graph[node.col - 1][node.row]
        if (!left.isVisited) nodes.push(left)
    }
    if (node.col + 1 < width && node.row >= 0) {
        let right = graph[node.col + 1][node.row]
        if (!right.isVisited) nodes.push(right)
    }
    if (node.col >= 0 && node.row + 1 < height) {
        let bottom = graph[node.col][node.row + 1]
        if (!bottom.isVisited) nodes.push(bottom)
    }
    return nodes
}

export function dijkstra(width, height, startX, startY, endX, endY) {
    let visitedNodesInOrder = []
    let startNodeAnimate = 0
    let animatedNormalNodes = []
    let endNodeAnimate = 0
    let graph = createGraph(width, height)
    graph[startX][startY].distance = 0

    let closestNode = findNodeWithMinDist(graph, width, height)
    let startNode = closestNode
    let endNode = graph[endX][endY]

    while (closestNode.row !== endY || closestNode.col !== endX) {
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        let { row, col } = closestNode

        if (closestNode === startNode) {
            startNodeAnimate = setTimeout(() => {
                document.getElementById(`node-${row}-${col}`)
                    .className = "dot startNodeAnimate"
            }, (visitedNodesInOrder.length) * 100)
        }
        if (closestNode !== startNode) {
            animatedNormalNodes.push(
                setTimeout(() => {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot visitedNode"
                }, (visitedNodesInOrder.length - 1) * 100)
            )
        }

        let unVisitedNodes = nodesNotVisitedFromGivenNode(graph, closestNode, width, height)
        updateDist(graph, unVisitedNodes, closestNode)

        closestNode = findNodeWithMinDist(graph, width, height)
    }
    endNodeAnimate = setTimeout(() => {
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNodeAnimate"
    }, (visitedNodesInOrder.length) * 100)

    visitedNodesInOrder.push(closestNode)

    let traceAnimations = traceBack(graph, startNode, endNode, visitedNodesInOrder)

    return [startNodeAnimate, animatedNormalNodes, endNodeAnimate, traceAnimations]
}

function updateDist(graph, unVisitedNodes, closestNode) {
    for (let k = 0; k < unVisitedNodes.length; k++) {
        let node = unVisitedNodes[k]
        let nodeInGraph = graph[node.col][node.row]

        if (nodeInGraph.distance > closestNode.distance + 1) {
            nodeInGraph.distance = closestNode.distance + 1
            nodeInGraph.previous = closestNode
        }
    }
}

function findNodeWithMinDist(graph, width, height) {
    let currentMin = Infinity
    let currentMinNode = null
    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
            if (graph[col][row].isVisited === false &&
                graph[col][row].distance < currentMin) {
                currentMin = graph[col][row].distance
                currentMinNode = graph[col][row]
            }
        }
    }
    return currentMinNode
}

function traceBack(graph, startNode, endNode, visitedNodesInOrder) {
    let shortestPath = []
    let startPathAnimate = 0
    let animatedPath = []
    let endPathAnimate = 0
    let currentNode = graph[endNode.col][endNode.row]

    while (currentNode.row !== startNode.row || currentNode.col !== startNode.col) {
        shortestPath.push(currentNode)
        currentNode = currentNode.previous
    }
    shortestPath.push(currentNode)
    shortestPath.reverse()

    // Sets starting and ending node to regular nodes and it can re-animate
    setTimeout(() => {
        document.getElementById(`node-${startNode.row}-${startNode.col}`)
            .className = "dot startNode"
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNode"
    }, (visitedNodesInOrder.length) * 101)

    for (let k = 0; k < shortestPath.length; k++) {
        let currentNode = shortestPath[k]
        const { row, col } = currentNode

        if (currentNode === startNode) {
            startPathAnimate = setTimeout(() => {
                document.getElementById(`node-${row}-${col}`)
                    .className = "dot startNodeAnimate"
            }, (visitedNodesInOrder.length + 1) * 101)
        }

        if (currentNode !== startNode && currentNode !== endNode) {
            animatedPath.push(
                setTimeout(() => {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot shortestPathNode"
                }, (visitedNodesInOrder.length + (k + 1)) * 101)
            )
        }
    }
    endPathAnimate = setTimeout(() => {
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNodeAnimate"
    }, (visitedNodesInOrder.length + shortestPath.length + 1) * 101)

    return [startPathAnimate, animatedPath, endPathAnimate]
}
