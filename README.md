# Towards web-native GenAI data visualiztions

As the GenAI zeitgiest pushes forward one of the most interesting use cases that is emerging is the of data visualisation. The AI is becoming really good at interacting with the databases via tools and getting insights from the data and explaining them on the text however a lot of the time one just wants the AI to help one by generating a graph/chart or a data visualisation. 

This seems to be a trivial problem to solve however as one delves into this problem space the realisation hits that it is not a trivial problem and need a lot of engineering. There are a lot of edge cases and if one is building a chat application on web, mobile or desktop the Frontend and the chatbot backend intergration becomes a huge bottle neck. 

On the chatbot llm end one required the LLM to generate the graph defintion with all the data points. This in itself is a very interesting proiblem space however this artical concerns itself with the display/ rendering of these data visualisation.

On the frontend side (the part of the application that is concerned with displaying the UI/UX to the user on any platform), the problem is that the existing tool are very specific and constrained. For the span of this artciel, ReactJS will be considered as the Frontend framework for the web appluication however this can be mapped to other frameowrks, platform and language.

In react there are various 
