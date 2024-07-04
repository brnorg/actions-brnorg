const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: '' });

const owner = 'brn-org';
const teamSlug = 'idp-team'; // Substitua pelo slug do time
const repo = 'security';

async function addRepoToTeam() {
    try {
        // Obter o ID do time
        const { data: teams } = await octokit.request('GET /orgs/{org}/teams', {
            org: owner
        });

        const team = teams.find(t => t.slug === teamSlug);
        if (!team) {
            console.error('Time não encontrado!');
            return;
        }

        const teamId = team.id;

        // Adicionar repositório ao time
        await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
            org: owner,
            team_slug: teamSlug,
            owner: owner,
            repo: repo,
            permission: 'push' // Permissões podem ser 'pull', 'push' ou 'admin'
        });

        console.log(`Repositório ${repo} adicionado ao time ${teamSlug} com sucesso!`);
    } catch (error) {
        console.error('Erro ao adicionar repositório ao time:', error);
    }
}

addRepoToTeam();
