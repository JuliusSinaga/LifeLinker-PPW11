package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/username/life-linker/controllers"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/users", controllers.GetUsers)
		api.POST("/users", controllers.CreateUser)
	}
}
