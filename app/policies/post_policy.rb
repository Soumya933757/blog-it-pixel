# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    post.organization_id == user.organization_id
  end

  def create?
    true
  end

  def update?
    owns_post?
  end

  def destroy?
    owns_post?
  end

  private

    def owns_post?
      post.user_id == user.id
    end
end
