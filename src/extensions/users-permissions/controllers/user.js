"use strict";
const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");

/**
 * A set of functions called "actions" for `users`
 */

module.exports = {
  async findBy(ctx) {
    const { username, email } = ctx.params;
    let matchedUserType;

    let users = await strapi.query("user", "users-permissions").find({
      _where: {
        _or: [[{ username }], [{ email }]],
      },
    });

    const matchedUsers = sanitizeEntity(users, {
      model: strapi.query("user", "users-permissions").model,
    });

    if (matchedUsers.length === 0) {
      return { matchedUsers: false, error: {} };
    } else {
      let matchedUsername = users.filter((usr) => usr.username === username);
      let matchedEmail = users.filter((usr) => usr.email === email);
      if (matchedUsername.length > 0) {
        matchedUserType = "Cage Code is already registered.";
      }
      if (matchedEmail.length > 0) {
        matchedUserType = "Email is already registered.";
      }
      return { matchedUsers: true, error: matchedUserType };
    }
  },
  async saveSolicitation(ctx) {
    const { solicitation, userId } = ctx.request.body;

    let user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });
    let previousSolicitations = user.solicitations;
    user = await strapi
      .query("user", "users-permissions")
      .update(
        { id: userId },
        { solicitations: [...previousSolicitations, solicitation] }
      );
    return user;
  },
  async getSolicitations(ctx) {
    const { id } = ctx.params;
    let user = await strapi.query("user", "users-permissions").findOne({ id });
    return user.solicitations;
  },
  async removeSolicitation(ctx) {
    const { userId, solicitationId } = ctx.params;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });
    const filteredSolicitations = user.solicitations.filter(
      ({ id }) => +solicitationId !== id
    );
    return await strapi
      .query("user", "users-permissions")
      .update({ id: userId }, { solicitations: [...filteredSolicitations] });
  },
};
