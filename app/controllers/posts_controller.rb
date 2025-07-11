# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user, :organization, :categories).all

    render status: :ok, json: {
      posts: posts.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice("Post was successfully created")
   end

  def show
    post = Post.includes(:user, :organization, :categories).find_by!(slug: params[:slug])

    render status: :ok, json: {
      post: post.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :categories)
    end
end
